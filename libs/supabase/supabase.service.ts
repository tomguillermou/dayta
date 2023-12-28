import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  readonly client = createClient(environment.supabase.url, environment.supabase.key);
}
