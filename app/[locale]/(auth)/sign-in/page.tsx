'use client';

import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Get URL and key
const url = String(process.env.NEXT_PUBLIC_SUPABASE_URL);
const key = String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(url, key);

const SignInPage = () => {
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const [authTheme, setAuthTheme] = useState('light');

  useEffect(() => {
    let resolvedTheme = 'light';
    if (theme === 'system') {
      resolvedTheme = systemTheme === 'dark' ? 'dark' : 'light';
    } else if (theme) {
      resolvedTheme = theme;
    }

    setAuthTheme(resolvedTheme);
  }, [theme, systemTheme]);

  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN'){
      router.push('/')
    } 
  })

  return (
    <div className="h-full">
      <div className="py-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
      </div>
      <div>
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{ theme: ThemeSupa }}
          theme={authTheme}
        />
      </div>
    </div>
  );
};

export default SignInPage;
