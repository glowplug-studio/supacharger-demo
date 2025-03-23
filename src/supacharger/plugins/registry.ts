export const SCP_REGISTRY = {
    BREVO: {
      ENABLED: true,
    },
  } as const;

  export type PluginsRegistry = typeof SCP_REGISTRY