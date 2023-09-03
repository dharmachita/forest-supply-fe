import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Inter } from 'next/font/google'
import AlmostRootLayout from '@/components/entirelayout';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Forest Supply Tracking Viewer',
  description: 'Forest supply viewer',
}

export default function RootLayout(props){
  
   return (
    <html lang="en">
      <body className={inter.className}>
        <AlmostRootLayout>
          {props.children}
        </AlmostRootLayout>
      </body>
    </html>
  )
}