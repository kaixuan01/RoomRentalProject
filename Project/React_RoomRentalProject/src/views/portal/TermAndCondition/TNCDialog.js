import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  styled,
  Typography,
  Divider,
  Tabs,
  Tab,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTNCCategoryService } from '../../../services/tncCategoryService';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: '800px',  
  },
}));

// Define the supported languages
const languages = [
  { id: 1, code: 'en', name: 'English' },
  { id: 2, code: 'zh', name: 'Mandarin' },
  { id: 3, code: 'ms', name: 'Malay' },
];

const validationSchema = Yup.object().shape({
  categoryId: Yup.number().required('Category is required'),
  tLegalTermsLanguages: Yup.array().of(
    Yup.object().shape({
      title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(150, 'Title must not exceed 150 characters'),
      description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),
      languageId: Yup.number().required('Language ID is required')
    })
  ).min(1, 'At least one language is required'),
  isActive: Yup.boolean().default(true)
});

const TNCDialog = ({ open, onClose, onSave, term }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [categories, setCategories] = useState([]);
  const tncCategoryService = useTNCCategoryService();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const loadCategories = () => {
    tncCategoryService.getCategories({
      onSuccess: (data) => {
        console.log(data)
        setCategories(data.items);
      },
      onError: (error) => {
        console.error("Error loading categories:", error);
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Initialize language entries from term or defaults
  const getInitialLanguages = () => {
    if (term && term.tLegalTermsLanguages && term.tLegalTermsLanguages.length > 0) {
      // Map existing language entries
      const languageDataMap = {};
      
      term.tLegalTermsLanguages.forEach(lang => {
        languageDataMap[lang.languageId] = {
          title: lang.title || '',
          description: lang.description || '',
          id: lang.id,
          legalTermId: term.id
        };
      });
      
      const mappedLang = languages.map(lang => ({
        languageId: lang.id,
        title: languageDataMap[lang.id]?.title || '',
        description: languageDataMap[lang.id]?.description || '',
        // Include id if it exists in the original data
        id: languageDataMap[lang.id]?.id,
        legalTermId: term.id
      }));
      return mappedLang;
    } else {
      // Create default empty entries for all languages
      const defaultLangs = languages.map(lang => ({
        languageId: lang.id,
        title: '',
        description: '',
      }));
      return defaultLangs;
    }
  };

  const formik = useFormik({
    initialValues: {
      id: term?.id || 0,
      categoryId: term?.categoryId || '',
      isActive: term?.isActive ?? true,
      tLegalTermsLanguages: getInitialLanguages(),
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Check for validation errors in any language tab
        const errors = formik.errors.tLegalTermsLanguages;
        if (errors) {
          // Find the first tab with validation error
          const errorIndex = errors.findIndex(error => error?.title || error?.description);
          if (errorIndex !== -1) {
            setActiveTab(errorIndex);
            return;
          }
        }

        const submitData = {
          legalTerm: {
            id: values.id,
            categoryId: values.categoryId,
            isActive: values.isActive,
            legalTermLanguages: values.tLegalTermsLanguages.map(lang => ({
              id: lang.id || 0,
              languageId: lang.languageId,
              legalTermId: lang.legalTermId || values.id,
              title: lang.title,
              content: lang.description
            }))
          },
        };

        await onSave(submitData);
      } catch (error) {
        console.error('Error in form submission:', error);
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  // Reset form when term changes
  useEffect(() => {
    if (open) {
      // Reset active tab to first tab when opening dialog
      setActiveTab(0);
      
      // Reset the form with new values
      formik.resetForm({
        values: {
          id: term?.id || 0,
          categoryId: term?.categoryId || '',
          isActive: term?.isActive ?? true,
          tLegalTermsLanguages: getInitialLanguages(),
        }
      });
    }
  }, [term, open]);

  return (
    <>
      <StyledDialog open={open} onClose={onClose}>
        <form onSubmit={(e) => {
          e.preventDefault();
          // Validate all fields before submission
          formik.validateForm().then(errors => {
            if (Object.keys(errors).length > 0) {
              // Check for language errors
              const langErrors = errors.tLegalTermsLanguages;
              if (langErrors) {
                const errorIndex = langErrors.findIndex(error => error?.title || error?.description);
                if (errorIndex !== -1) {
                  // Set touched state for the field with error
                  formik.setTouched({
                    tLegalTermsLanguages: langErrors.map((_, index) => ({
                      title: index === errorIndex,
                      description: index === errorIndex
                    }))
                  });
                  setActiveTab(errorIndex);
                }
              }
              return;
            }
            formik.handleSubmit(e); 
          });
        }}>
          <DialogTitle>
            {term ? 'Edit Term and Condition' : 'Add New Term and Condition'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth required error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="categoryId"
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.categoryId && formik.errors.categoryId && (
                    <Typography color="error" variant="caption">
                      {formik.errors.categoryId}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Term and Condition Content
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange} 
                  variant="fullWidth"
                  sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
                >
                  {languages.map((lang, index) => (
                    <Tab key={lang.id} label={lang.name} id={`lang-tab-${index}`} />
                  ))}
                </Tabs>
                
                {languages.map((lang, index) => {
                  return <Box
                    key={lang.id}
                    role="tabpanel"
                    hidden={activeTab !== index}
                    id={`lang-tabpanel-${index}`}
                  >
                    {activeTab === index && (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name={`tLegalTermsLanguages[${index}].title`}
                            label={`${lang.name} Title`}
                            value={formik.values.tLegalTermsLanguages[index].title}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.tLegalTermsLanguages?.[index]?.title && 
                              Boolean(formik.errors.tLegalTermsLanguages?.[index]?.title)
                            }
                            helperText={
                              formik.touched.tLegalTermsLanguages?.[index]?.title && 
                              formik.errors.tLegalTermsLanguages?.[index]?.title
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={8}
                            name={`tLegalTermsLanguages[${index}].description`}
                            label={`${lang.name} Description`}
                            value={formik.values.tLegalTermsLanguages[index].description}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.tLegalTermsLanguages?.[index]?.description && 
                              Boolean(formik.errors.tLegalTermsLanguages?.[index]?.description)
                            }
                            helperText={
                              formik.touched.tLegalTermsLanguages?.[index]?.description && 
                              formik.errors.tLegalTermsLanguages?.[index]?.description
                            }
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                })}
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      name="isActive"
                      checked={formik.values.isActive}
                      onChange={(e) => formik.setFieldValue('isActive', e.target.checked)}
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={onClose}
              disabled={formik.isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Saving...' : term ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>
    </>
  );
};

export default TNCDialog; 