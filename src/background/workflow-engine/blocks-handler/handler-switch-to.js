import { objectHasKey } from '@/utils/helper';
import { getBlockConnection } from '../helper';
import executeContentScript, { getFrames } from '../execute-content-script';

async function switchTo(block) {
  const nextBlockId = getBlockConnection(block);

  try {
    if (block.data.windowType === 'main-window') {
      this.frameId = 0;

      delete this.frameSelector;

      return {
        data: '',
        nextBlockId,
      };
    }

    const frames = await getFrames(this.tabId);
    const { url, isSameOrigin } = await this._sendMessageToTab(block, {
      frameId: 0,
    });

    if (isSameOrigin) {
      this.frameSelector = block.data.selector;

      return {
        data: block.data.selector,
        nextBlockId,
      };
    }

    if (objectHasKey(frames, url)) {
      this.frameId = this.frames[url];

      await executeContentScript(this.tabId, this.frameId);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        data: this.frameId,
        nextBlockId,
      };
    }

    throw new Error('no-iframe-id');
  } catch (error) {
    error.data = { selector: block.data.selector };
    error.nextBlockId = nextBlockId;

    throw error;
  }
}

export default switchTo;
