import '@/styles/globals.scss'
// Next.js allows you to import CSS directly in .js files.
// It handles optimization and all the necessary Webpack configuration to make this work.
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import DictionaryProvider from '@/locales/DictionaryProvider'
import { getDictionary } from '@/locales/dictionary'
import getTheme from '@/themes/theme'

// You change this configuration value to false so that the Font Awesome core SVG library
// will not try and insert <style> elements into the <head> of the page.
// Next.js blocks this from happening anyway so you might as well not even try.
// See https://fontawesome.com/v6/docs/web/use-with/react/use-with#next-js
config.autoAddCss = false

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dictionary = await getDictionary()

  return (
    <html lang="en" data-bs-theme={getTheme()}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.USER_DATA = {
              "id": "374494",
              "email": "yuriy.khoma@reflecto.ai",
              "email_verified": true,
              "first_name": "Yuriy",
              "last_name": "Khoma",
              "full_name": "Yuriy Khoma",
              };\n
              // For demonstration, let's log the USER_DATA to the console\n
              console.log(window.USER_DATA);
            `,
          }}
        />
      </head>
      <body>
        <ProgressBar />
        <DictionaryProvider dictionary={dictionary}>
          {children}
        </DictionaryProvider>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://reflectoadmin.s3.amazonaws.com/client-widget/index.css"
        />
        <script
          type="module"
          src="https://reflectoadmin.s3.amazonaws.com/client-widget/index.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('DOMContentLoaded', function() {window.ChatAi.init({projectId: "8b3949ec-5ddc-4967-aebb-6e6caf960a29"});});`
            ,
          }}
        ></script>
      </body>
    </html>
  )
}
