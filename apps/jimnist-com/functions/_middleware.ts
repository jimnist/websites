const PROTECTED_PATHS = ['/2bwed', '/photos'];

interface Env {
  BASIC_AUTH_USER: string;
  BASIC_AUTH_PASS: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);

  // Check if path needs protection
  const needsAuth = PROTECTED_PATHS.some(path => url.pathname.startsWith(path));
  if (!needsAuth) {
    return context.next();
  }

  // Check for basic auth header
  const auth = context.request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Basic ')) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"',
      },
    });
  }

  // Verify credentials
  try {
    const [user, pass] = atob(auth.slice(6)).split(':');
    const validUser = context.env.BASIC_AUTH_USER;
    const validPass = context.env.BASIC_AUTH_PASS;

    if (!validUser || !validPass) {
      console.error('BASIC_AUTH_USER or BASIC_AUTH_PASS not configured');
      return context.next(); // Allow access if auth not configured (for dev)
    }

    if (user !== validUser || pass !== validPass) {
      return new Response('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Protected Area"',
        },
      });
    }
  } catch (e) {
    return new Response('Invalid authorization header', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"',
      },
    });
  }

  return context.next();
};
