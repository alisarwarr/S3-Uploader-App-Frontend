//NEXTJS
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
//AMPLIFY
import ConfigureAmplifyClientSide from './aws-exports';
//STYLES
import './globals.css';


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
    title: "S3 Uploader App",
    description: "using AWS CDK typescript"
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ConfigureAmplifyClientSide />
                {children}
            </body>
        </html>
    )
}