import { getEnvVar } from '@/supacharger/utils/helpers';
import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';

/**
 * Initialize Brevo API client with API key from environment variables
 */
const createBrevoClient = (): TransactionalEmailsApi => {
  const apiInstance = new TransactionalEmailsApi();
  
  try {
    const apiKey = getEnvVar(process.env.BREVO_API_KEY, 'BREVO_API_KEY');
    apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey);
    return apiInstance;
  } catch (error) {
    console.error('Failed to initialize Brevo client:', error);
    throw new Error('Brevo API key is required');
  }
};

export const brevoClient = createBrevoClient(); 