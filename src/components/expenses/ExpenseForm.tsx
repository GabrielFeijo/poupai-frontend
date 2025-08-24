import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { useCategories } from '@/hooks/categories/useCategories';
import { useCreateExpense } from '@/hooks/expenses/useCreateExpense';
import { useUpdateExpense } from '@/hooks/expenses/useUpdateExpense';
import { expenseSchema, type ExpenseFormData } from '@/lib/validations';
import { ExpenseType, type Expense } from '@/types/expense.types';
import { EXPENSE_TYPES } from '@/lib/constants';

interface ExpenseFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	expense?: Expense;
}

export const ExpenseForm = ({
	open,
	onOpenChange,
	expense,
}: ExpenseFormProps) => {
	const { data: categories = [] } = useCategories();
	const createMutation = useCreateExpense();
	const updateMutation = useUpdateExpense();

	const isEditing = !!expense;

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setValue,
	} = useForm<ExpenseFormData>({
		resolver: zodResolver(expenseSchema),
		defaultValues: {
			description: expense?.description || '',
			amount: expense?.amount || 0,
			date: expense?.date || format(new Date(), 'yyyy-MM-dd'),
			type: expense?.type || ExpenseType.EXPENSE,
			categoryId: expense?.categoryId || '',
		},
	});

	React.useEffect(() => {
		if (expense) {
			setValue('description', expense.description);
			setValue('amount', expense.amount);
			setValue('date', format(new Date(expense.date), 'yyyy-MM-dd'));
			setValue('type', expense.type);
			setValue('categoryId', expense.categoryId);
		} else {
			reset();
		}
	}, [expense, setValue, reset]);

	const onSubmit = async (data: ExpenseFormData) => {
		try {
			if (isEditing) {
				await updateMutation.mutateAsync({
					id: expense.id,
					data: {
						...data,
						date: new Date(data.date).toISOString(),
					},
				});
			} else {
				await createMutation.mutateAsync({
					...data,
					date: new Date(data.date).toISOString(),
				});
			}
			onOpenChange(false);
			reset();
		} catch (error) {
			console.error(error);
		}
	};

	const isPending = createMutation.isPending || updateMutation.isPending;

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>
						{isEditing ? 'Editar' : 'Nova'}{' '}
						{expense?.type === 'INCOME' ? 'Receita' : 'Despesa'}
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-4'
				>
					<div className='space-y-2'>
						<Label htmlFor='description'>Descrição</Label>
						<Input
							id='description'
							placeholder='Descrição da transação'
							{...register('description')}
						/>
						{errors.description && (
							<p className='text-sm text-destructive'>
								{errors.description.message}
							</p>
						)}
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='amount'>Valor</Label>
							<Input
								id='amount'
								type='number'
								step='0.01'
								min='0'
								placeholder='0,00'
								{...register('amount', { valueAsNumber: true })}
							/>
							{errors.amount && (
								<p className='text-sm text-destructive'>
									{errors.amount.message}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='date'>Data</Label>
							<Input
								id='date'
								type='date'
								{...register('date')}
							/>
							{errors.date && (
								<p className='text-sm text-destructive'>
									{errors.date.message}
								</p>
							)}
						</div>
					</div>

					<div className='space-y-2'>
						<Label>Tipo</Label>
						<Controller
							name='type'
							control={control}
							render={({ field }) => (
								<Select
									value={field.value}
									onValueChange={field.onChange}
								>
									<SelectTrigger>
										<SelectValue placeholder='Selecione o tipo' />
									</SelectTrigger>
									<SelectContent>
										{Object.values(EXPENSE_TYPES).map((type) => (
											<SelectItem
												key={type.value}
												value={type.value}
											>
												<span className={type.color}>{type.label}</span>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.type && (
							<p className='text-sm text-destructive'>{errors.type.message}</p>
						)}
					</div>

					<div className='space-y-2'>
						<Label>Categoria</Label>
						<Controller
							name='categoryId'
							control={control}
							render={({ field }) => (
								<Select
									value={field.value}
									onValueChange={field.onChange}
								>
									<SelectTrigger>
										<SelectValue placeholder='Selecione a categoria' />
									</SelectTrigger>
									<SelectContent>
										{categories.map((category) => (
											<SelectItem
												key={category.id}
												value={category.id}
											>
												<div className='flex items-center gap-2'>
													<div
														className='h-3 w-3 rounded-full'
														style={{ backgroundColor: category.color }}
													/>
													{category.name}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.categoryId && (
							<p className='text-sm text-destructive'>
								{errors.categoryId.message}
							</p>
						)}
					</div>

					<DialogFooter>
						<Button
							type='button'
							variant='outline'
							onClick={() => onOpenChange(false)}
						>
							Cancelar
						</Button>
						<Button
							type='submit'
							disabled={isPending}
						>
							{isPending ? 'Salvando...' : 'Salvar'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
