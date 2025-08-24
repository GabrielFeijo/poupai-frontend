import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useCreateCategory } from '@/hooks/categories/useCreateCategory';
import { useUpdateCategory } from '@/hooks/categories/useUpdateCategory';
import { Category } from '@/types/category.types';

const categorySchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    description: z.string().optional(),
    color: z.string().min(1, 'Selecione uma cor'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: Category;
}

const predefinedColors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
    '#ec4899', '#f43f5e', '#64748b', '#6b7280', '#374151',
];

export const CategoryForm = ({ open, onOpenChange, category }: CategoryFormProps) => {
    const [selectedColor, setSelectedColor] = React.useState(category?.color || predefinedColors[0]);
    const createMutation = useCreateCategory();
    const updateMutation = useUpdateCategory();

    const isEditing = !!category;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name || '',
            description: category?.description || '',
            color: category?.color || predefinedColors[0],
        },
    });

    React.useEffect(() => {
        if (category) {
            setValue('name', category.name);
            setValue('description', category.description || '');
            setValue('color', category.color);
            setSelectedColor(category.color);
        } else {
            reset();
            setSelectedColor(predefinedColors[0]);
            setValue('color', predefinedColors[0]);
        }
    }, [category, setValue, reset]);

    React.useEffect(() => {
        setValue('color', selectedColor);
    }, [selectedColor, setValue]);

    const onSubmit = async (data: CategoryFormData) => {
        try {
            if (isEditing) {
                await updateMutation.mutateAsync({
                    id: category.id,
                    data,
                });
            } else {
                await createMutation.mutateAsync(data);
            }
            onOpenChange(false);
            reset();
        } catch (error) {
            // Error is handled by the mutation
        }
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome da Categoria *</Label>
                        <Input
                            id="name"
                            placeholder="Ex: Alimentação, Transporte..."
                            {...register('name')}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            placeholder="Descrição opcional da categoria"
                            rows={3}
                            {...register('description')}
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Cor da Categoria *</Label>
                        <div className="flex items-center gap-2 mb-2">
                            <div
                                className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                                style={{ backgroundColor: selectedColor }}
                            />
                            <span className="text-sm text-muted-foreground">
                                Cor selecionada: {selectedColor}
                            </span>
                        </div>
                        <div className="grid grid-cols-10 gap-2">
                            {predefinedColors.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${selectedColor === color
                                            ? 'border-gray-900 dark:border-gray-100 shadow-lg'
                                            : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                        <div className="mt-2">
                            <Label htmlFor="customColor" className="text-xs">
                                Ou escolha uma cor personalizada:
                            </Label>
                            <Input
                                id="customColor"
                                type="color"
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                className="w-20 h-8 p-1 mt-1"
                            />
                        </div>
                        {errors.color && (
                            <p className="text-sm text-destructive">
                                {errors.color.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};