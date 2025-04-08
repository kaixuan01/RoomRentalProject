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

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: '800px',
  },
}));

// Define the supported languages
const languages = [
  { id: 1, code: 'en', name: 'English' },
  { id: 2, code: 'ms', name: 'Malay' },
  { id: 3, code: 'zh', name: 'Chinese' },
];

const validationSchema = Yup.object({
  'tLegalTermsCategoriesLanguages[0].description': Yup.string().required('English description is required'),
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
        descriptionsMap[lang.languageId] = lang.description || '';
      });
      
      var mappedLang = languages.map(lang => ({
        languageId: lang.id,
        description: descriptionsMap[lang.id] || '',
        // Include id if it exists in the original data
        id: category.tLegalTermsCategoriesLanguages.find(l => l.languageId === lang.id)?.id,
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
    onSubmit: (values) => {
      // Make sure to include languageId in each language entry
      const processedValues = {
        ...values,
        tLegalTermsCategoriesLanguages: values.tLegalTermsCategoriesLanguages.map((lang, index) => ({
          ...lang,
          languageId: languages[index].id,
        }))
      };
      onSave(processedValues);
    },
    enableReinitialize: true, // This ensures the form resets when initialValues change
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
    <StyledDialog open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
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
  );
};

export default TNCCategoryDialog; 