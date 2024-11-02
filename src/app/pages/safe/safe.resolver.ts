import {inject, Signal} from '@angular/core';
import {SafeService} from './safe.service';
import {ResolvedSafeModel} from './safe.models';
import {ActivatedRoute, ResolveFn} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

const safeModelResolver: ResolveFn<ResolvedSafeModel> = async (): Promise<ResolvedSafeModel> => {
  try {
    return {
      ...await inject(SafeService).getFiles(),
      filesError: undefined,
    }
  } catch (error) {
    return {
      files: [],
      filesError: {
        type: 'danger',
        message: 'safe.files.notification.failed',
      }
    }
  }
}

export const safeResolver = () => ({
  model: safeModelResolver
});

export const fromResolver = <T>(
  route: ActivatedRoute,
  property: string,
  initialValue: T
): Signal<T> => toSignal(
  route.data.pipe(map(data => data[property] as T)),
  {initialValue}
);
