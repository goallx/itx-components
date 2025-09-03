import Link from 'next/link'

export default function AuthError() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h2>Authentication Error</h2>
            <p>Something went wrong during the authentication process.</p>
            <Link href="/auth" style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#4285F4',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px'
            }}>
                Try Again
            </Link>
        </div>
    )
}