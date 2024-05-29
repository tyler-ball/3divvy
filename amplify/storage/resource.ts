import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'toybox3d',
  access: (allow) => ({
    'models/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read', 'write'])
    ],
  })
});