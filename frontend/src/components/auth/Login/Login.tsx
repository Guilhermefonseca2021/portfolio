import { useState } from "react";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserContext } from "../../../contexts/UserContext";
import fonsecaApi from "../../../services/fonsecaApi";
import { notifyToast } from "../../ui/GlobalToast";
import { saveSession } from "../../../utils/session";

const loginSchema = z.object({
  email: z.string().min(1, "Informe seu e-mail").email("E-mail inválido"),
  password: z.string().min(6, "A senha deve possuir pelo menos 6 caracteres"),
  remember: z.boolean(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const { refresh } = useUserContext();

  async function onSubmit(data: LoginForm) {
    setSubmitError(null);

    try {
      const response = await fonsecaApi.auth.login({
        email: data.email,
        password: data.password,
      });

      saveSession(response.token, data.remember);
      await refresh();
      navigate("/dashboard");
    } catch (error) {
      const message = fonsecaApi.utils.getErrorMessage(
        error,
        "Não foi possível entrar no sistema.",
      );
      setSubmitError(message);
      notifyToast(message, "error");
    }
  }

  return (
    <section className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="border-b border-white/10 p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-center text-white">
            Bem-vindo
          </h1>

          <p className="text-center text-secondaryText mt-2">
            Faça login para continuar
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-black hover:scale-[1.02] transition"
            >
              <FaGithub />
              Github
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-black hover:scale-[1.02] transition"
            >
              <FaGoogle />
              Google
            </button>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-widest text-secondaryText">
              ou
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-6 sm:p-8"
        >
          <div>
            <label className="mb-2 block text-sm text-secondaryText">
              Email
            </label>

            <input
              {...register("email")}
              placeholder="email@empresa.com"
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-white outline-none transition focus:border-primary"
            />

            {errors.email && (
              <p className="mt-1.5 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm text-secondaryText">
              Senha
            </label>

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 pr-12 text-white outline-none transition focus:border-primary"
              />

              <button
                type="button"
                onClick={() => setShowPassword((old) => !old)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-secondaryText cursor-pointer">
              <input
                type="checkbox"
                {...register("remember")}
                className="accent-primary w-4 h-4 rounded"
              />
              Lembrar de mim
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>

          {submitError && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {submitError}
            </p>
          )}

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary py-3 font-semibold text-primaryText transition hover:brightness-110 disabled:opacity-50 mt-2"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-secondaryText pt-2">
            Não possui uma conta?
            <Link
              to="/register"
              className="ml-1 font-semibold text-primary hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
