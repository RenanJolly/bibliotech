'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';

// Schema de validação com Yup
const loginSchema = yup.object({
  email: yup
    .string()
    .email('Email deve ter um formato válido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Login realizado com sucesso!');
      console.log('Dados do login:', data);
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-bege-claro via-bege-muito-claro to-bege-principal flex items-center justify-center p-4 relative">
      {/* Padrão de madeira sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(139, 115, 85, 0.1) 2px,
            rgba(139, 115, 85, 0.1) 4px
          )`
        }}></div>
      </div>

      {/* Elementos decorativos modernos */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-linear-to-br from-dourado/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-linear-to-tl from-marrom-papel/15 to-transparent rounded-full blur-3xl"></div>

      <div className="relative bg-white/80 backdrop-blur-xl border border-bege-principal/30 rounded-3xl shadow-2xl p-12 w-full max-w-md">
        {/* Logo moderno */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-dourado to-dourado-escuro rounded-2xl mb-6 shadow-lg">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-marrom-escuro to-marrom-papel bg-clip-text text-transparent mb-3">
            Bibliotech
          </h1>
          <p className="text-marrom-papel/80 text-sm font-medium">
            Sua biblioteca digital moderna
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-marrom-escuro">
              Email
            </label>
            <div className="relative">
              <input
                {...register('email')}
                type="email"
                id="email"
                className={`w-full px-4 py-4 bg-white/70 backdrop-blur-sm border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.email
                    ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                    : 'border-bege-principal/50 focus:ring-dourado/30 focus:border-dourado'
                }`}
                placeholder="seu@email.com"
              />
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-marrom-escuro">
              Senha
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type="password"
                id="password"
                className={`w-full px-4 py-4 bg-white/70 backdrop-blur-sm border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.password
                    ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                    : 'border-bege-principal/50 focus:ring-dourado/30 focus:border-dourado'
                }`}
                placeholder="Sua senha"
              />
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 font-medium">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-linear-to-r from-dourado via-dourado-escuro to-marrom-papel hover:from-dourado-escuro hover:via-marrom-papel hover:to-marrom-escuro text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:transform-none relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </form>

        {/* Elemento decorativo moderno */}
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-px bg-linear-to-r from-transparent via-bege-principal to-transparent"></div>
        </div>
      </div>
    </div>
  );
}