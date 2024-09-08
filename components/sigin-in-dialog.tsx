import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

export function SignInDialog() {
  async function handleLoginWithGoogleClick() {
    await signIn("google")
  }

  return (
    <DialogContent className="w-[90%] rounded-[10px] border-none bg-gray01">
      <DialogHeader>
        <DialogTitle>Faça seu login na plataforma</DialogTitle>
        <DialogDescription className="text-xs text-gray-400">
          Conecte-se usando sua conta do Google e comece a agendar seus cortes
          de cabelo de forma fácil e eficiente.
        </DialogDescription>
      </DialogHeader>

      <Button
        className="borde-gray01 rounded-[8px] border font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        Google
      </Button>
    </DialogContent>
  )
}
