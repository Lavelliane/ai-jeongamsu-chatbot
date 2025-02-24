import { flag } from 'flags/next';
 
export const enableAudio = flag({
  key: 'enable-audio',
  decide() {
    return true;
  },
});