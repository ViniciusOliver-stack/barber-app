import { Card, CardContent } from "./ui/card"

export function Footer() {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer>
      <Card className="border-none">
        <CardContent className="border-t border-gray01 px-5 py-6">
          <p className="text-sm">{year} Copyright Symplus 💜</p>
        </CardContent>
      </Card>
    </footer>
  )
}
