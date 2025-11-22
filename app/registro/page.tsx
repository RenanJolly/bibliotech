"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { HiMail, HiLockClosed, HiUser, HiArrowRight } from "react-icons/hi";

// Schema de validação do cadastro
const registerSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("Confirmação de senha obrigatória"),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    const registerPromise = fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar");
      }
      return response.json();
    });

    toast.promise(registerPromise, {
      loading: "Cadastrando...",
      success: () => "Cadastro realizado com sucesso!",
      error: (error) => error instanceof Error ? error.message : "Erro no cadastro",
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom right, #f7ead9, #e1d2a9, #f7ead9)" }}
    >
      {/* Fundo texturizado */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(103, 89, 78, 0.1) 2px, rgba(103, 89, 78, 0.1) 4px)",
          }}
        />
      </div>

      {/* Decorações */}
      <div
        className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl"
        style={{ background: "linear-gradient(to bottom right, rgba(136,180,153,0.2), transparent)" }}
      ></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "linear-gradient(to top left, rgba(97,152,133,0.15), transparent)" }}
      ></div>

      {/* Container */}
      <div
        className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden"
        style={{ border: "1px solid rgba(225,210,169,0.3)" }}
      >
        <div className="flex min-h-[600px]">
          {/* Painel esquerdo */}
          <div
            className="flex-1 p-12 flex flex-col justify-center relative"
            style={{ background: "linear-gradient(to bottom right, #619885, #88b499, #67594e)" }}
          >
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-white mb-6 leading-tight">Crie sua conta</h1>
              <p className="text-white/90 text-lg leading-relaxed">
                Cadastre-se para acessar sua biblioteca virtual personalizada.
              </p>
            </div>
          </div>

          {/* Painel direito */}
          <div className="flex-1 p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2" style={{ color: "#67594e" }}>
                  Cadastro
                </h2>
                <p className="text-sm" style={{ color: "rgba(103,89,78,0.7)" }}>
                  Crie sua conta Bibliotech
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nome */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: "#67594e" }}>
                    Nome completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <HiUser className="h-5 w-5" style={{ color: "#4a3c2a" }} />
                    </div>
                    <input
                      {...register("name")}
                      type="text"
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.name
                          ? "border-red-400 focus:ring-red-200"
                          : "border-gray-300 focus:ring-orange-300"
                      }`}
                      style={{ backgroundColor: "rgba(247,234,217,0.9)" }}
                      placeholder="Seu nome"
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-600 font-medium">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: "#67594e" }}>
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <HiMail className="h-5 w-5" style={{ color: "#4a3c2a" }} />
                    </div>
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.email
                          ? "border-red-400 focus:ring-red-200"
                          : "border-gray-300 focus:ring-orange-300"
                      }`}
                      style={{ backgroundColor: "rgba(247,234,217,0.9)" }}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-600 font-medium">{errors.email.message}</p>}
                </div>

                {/* Senha */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: "#67594e" }}>
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <HiLockClosed className="h-5 w-5" style={{ color: "#4a3c2a" }} />
                    </div>
                    <input
                      {...register("password")}
                      type="password"
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.password
                          ? "border-red-400 focus:ring-red-200"
                          : "border-gray-300 focus:ring-orange-300"
                      }`}
                      style={{ backgroundColor: "rgba(247,234,217,0.9)" }}
                      placeholder="Crie uma senha"
                    />
                  </div>
                  {errors.password && <p className="text-sm text-red-600 font-medium">{errors.password.message}</p>}
                </div>

                {/* Confirmar senha */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold" style={{ color: "#67594e" }}>
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <HiLockClosed className="h-5 w-5" style={{ color: "#4a3c2a" }} />
                    </div>
                    <input
                      {...register("confirmPassword")}
                      type="password"
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.confirmPassword
                          ? "border-red-400 focus:ring-red-200"
                          : "border-gray-300 focus:ring-orange-300"
                      }`}
                      style={{ backgroundColor: "rgba(247,234,217,0.9)" }}
                      placeholder="Repita a senha"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 font-medium">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] relative overflow-hidden group"
                  style={{ background: "#619885" }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Cadastrando...
                      </>
                    ) : (
                      <>
                        Criar Conta
                        <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm" style={{ color: "rgba(103,89,78,0.7)" }}>
                  Já possui conta?{' '}
                  <a href="/" className="font-semibold transition-colors" style={{ color: "#619885" }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#88b499'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#619885'}>
                    Entrar
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
