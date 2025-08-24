import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Coins, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useLogin } from "@/hooks/auth/useLogin";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { ROUTES } from "@/lib/constants";

export const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
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
                    <CardHeader className="space-y-1 text-center pt-8">
                        <CardTitle className="text-2xl font-semibold">
                            Bem-vindo de volta 👋
                        </CardTitle>
                        <CardDescription>
                            Entre com sua conta para continuar
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4 px-8">
                            <div className="space-y-2 text-left">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2 text-left">
                                <Label htmlFor="password">Senha</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Sua senha"
                                        {...register("password")}
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

                        <CardFooter className="flex flex-col space-y-4 px-8 pb-8">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending ? "Entrando..." : "Entrar"}
                            </Button>

                            <p className="text-center text-sm text-muted-foreground">
                                Não tem uma conta?{" "}
                                <Link to={ROUTES.REGISTER} className="text-primary hover:underline">
                                    Cadastre-se
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};
