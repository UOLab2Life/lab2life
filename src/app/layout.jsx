import '@/styles/tailwind.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-gray-950 antialiased">{children}</body>
    </html>
  )
}
