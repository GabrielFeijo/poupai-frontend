import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Coins, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRegister } from '@/hooks/auth/useRegister';
import { registerSchema, type RegisterFormData } from '@/lib/validations';
import { ROUTES } from '@/lib/constants';

export const RegisterForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-card rounded-2xl shadow-xl overflow-hidden">
                <div className="hidden md:flex flex-col justify-center items-center bg-primary text-primary-foreground p-10 space-y-6">
                    <h1 className="text-4xl font-bold flex items-center gap-2">
                        <span>poupAí</span>
                        <Coins className=" text-primary-foreground" />
                    </h1>
                    <img
                        src="https://i.imgur.com/zfnnRX7.png"
                        alt="Ilustração poupança"
                        className="max-w-xs rounded-2xl"
                    />
                    <p className="text-lg opacity-90 text-center">
                        Organize seus gastos, economize mais <br /> e alcance seus objetivos.
                    </p>
                </div>

                <Card className="border-0 shadow-none rounded-none md:rounded-l-2xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
                        <CardDescription className="text-center">
                            Crie sua conta para começar
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4 px-8">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Seu nome completo"
                                    {...register('name')}
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Sua senha"
                                        {...register('password')}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-destructive">{errors.password.message}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 px-8">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={registerMutation.isPending}
                            >
                                {registerMutation.isPending ? 'Criando conta...' : 'Criar Conta'}
                            </Button>
                            <p className="text-center text-sm text-muted-foreground">
                                Já tem uma conta?{' '}
                                <Link to={ROUTES.LOGIN} className="text-primary hover:underline">
                                    Entre aqui
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>

            </div>
        </div>
    );
};
