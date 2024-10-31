import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {ListModel} from './safe.model';
import {SafeService} from './safe.service';

const safeFileListResolver: ResolveFn<ListModel> = async () => {
  try {
    return {
      ...await inject(SafeService).getFiles(),
      error: undefined,
    }
  } catch (error) {
    return {
      files: [],
      error: error as Error,
    }
  }
}

export const safeResolver = () => ({
  list: safeFileListResolver
});
