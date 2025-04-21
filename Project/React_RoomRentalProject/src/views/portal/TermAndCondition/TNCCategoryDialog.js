import React, { useEffect } from 'react';
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
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import zIndex from '@mui/material/styles/zIndex';

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
  tLegalTermsCategoriesLanguages: Yup.array().of(
    Yup.object().shape({
      description: Yup.string()
        .required('Description is required')
        .min(3, 'Description must be at least 3 characters')
        .max(500, 'Description must not exceed 500 characters'),
      languageId: Yup.number().required('Language ID is required')
    })
  ).min(1, 'At least one language description is required'),
  isActive: Yup.boolean().default(true)
});

const TNCCategoryDialog = ({ open, onClose, onSave, category }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Initialize language descriptions from category or defaults
  const getInitialDescriptions = () => {
    if (category && category.tLegalTermsCategoriesLanguages && category.tLegalTermsCategoriesLanguages.length > 0) {
      // Map existing language descriptions
      const descriptionsMap = {};
      
      category.tLegalTermsCategoriesLanguages.forEach(lang => {
        descriptionsMap[lang.languageId] = {
          description: lang.description || '',
          id: lang.id,
          legalTermCategoryId: category.id
        };
      });
      
      var mappedLang = languages.map(lang => ({
        languageId: lang.id,
        description: descriptionsMap[lang.id]?.description || '',
        // Include id if it exists in the original data
        id: descriptionsMap[lang.id]?.id,
        legalTermCategoryId: category.id
      }));
      return mappedLang;
    } else {
      // Create default empty descriptions for all languages
      const defaultLangs = languages.map(lang => ({
        languageId: lang.id,
        description: '',
      }));
      return defaultLangs;
    }
  };

  const formik = useFormik({
    initialValues: {
      id: category?.id || 0,
      isActive: category?.isActive ?? true,
      tLegalTermsCategoriesLanguages: getInitialDescriptions(),
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Check for validation errors in any language tab
        const errors = formik.errors.tLegalTermsCategoriesLanguages;
        if (errors) {
          // Find the first tab with validation error
          const errorIndex = errors.findIndex(error => error?.description);
          if (errorIndex !== -1) {
            setActiveTab(errorIndex);
            return;
          }
        }

        console.log('Form submitted with values:', values);
        const submitData = {
          legalTermCategories: {
            id: values.id,
            isActive: values.isActive,
            legalTermCategoriesLanguages: values.tLegalTermsCategoriesLanguages.map(lang => ({
              id: lang.id || 0,
              languageId: lang.languageId,
              legalTermCategoryId: lang.legalTermCategoryId || values.id,
              categoryName: values.categoryName || '',
              description: lang.description
            }))
          },
        };

        console.log('Processed submit data:', submitData);
        await onSave(submitData);
      } catch (error) {
        console.error('Error in form submission:', error);
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  // Reset form when category changes
  useEffect(() => {
    if (open) {
      // Reset active tab to first tab when opening dialog
      setActiveTab(0);
      
      // Reset the form with new values
      formik.resetForm({
        values: {
          id: category?.id || 0,
          isActive: category?.isActive ?? true,
          tLegalTermsCategoriesLanguages: getInitialDescriptions(),
        }
      });
    }
  }, [category, open]);

  return (
    <>
      <StyledDialog open={open} onClose={onClose}>
        <form onSubmit={(e) => {
          e.preventDefault();
          // Validate all fields before submission
          formik.validateForm().then(errors => {
            if (Object.keys(errors).length > 0) {
              // Check for language description errors
              const langErrors = errors.tLegalTermsCategoriesLanguages;
              if (langErrors) {
                const errorIndex = langErrors.findIndex(error => error?.description);
                if (errorIndex !== -1) {
                  // Set touched state for the field with error
                  formik.setTouched({
                    tLegalTermsCategoriesLanguages: langErrors.map((_, index) => ({
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
            {category ? 'Edit Category' : 'Add New Category'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Term and Condition Descriptions
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
                      <TextField
                        fullWidth
                        multiline
                        rows={8}
                        name={`tLegalTermsCategoriesLanguages[${index}].description`}
                        label={`${lang.name} Description`}
                        value={formik.values.tLegalTermsCategoriesLanguages[index].description}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.tLegalTermsCategoriesLanguages?.[index]?.description && 
                          Boolean(formik.errors.tLegalTermsCategoriesLanguages?.[index]?.description)
                        }
                        helperText={
                          formik.touched.tLegalTermsCategoriesLanguages?.[index]?.description && 
                          formik.errors.tLegalTermsCategoriesLanguages?.[index]?.description
                        }
                      />
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
              {formik.isSubmitting ? 'Saving...' : category ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>
    </>
  );
};

export default TNCCategoryDialog; 