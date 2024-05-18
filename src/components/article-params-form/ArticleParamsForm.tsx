import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Text } from '../text';
import { Separator } from '../separator';
import { SyntheticEvent, useRef, useState } from 'react';
import { Select } from '../select';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { RadioGroup } from '../radio-group';

type ArticleParamsFormProps = {
	articleState: TArticleState;
	setArticleState: (
		articleState: ArticleParamsFormProps['articleState']
	) => void;
};

type TArticleState = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [formState, formValue] = useState(defaultArticleState);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const openClose = () => {
		setIsMenuOpen((windowIsOpen) => !windowIsOpen);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: (newValue: boolean) => setIsMenuOpen(newValue),
	});

	const handleChange = (type: keyof typeof articleState, value: OptionType) => {
		formValue((windowFormState) => ({
			...windowFormState,
			[type]: value,
		}));
	};

	const handleReset = () => {
		formValue(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleFormSubmit = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setArticleState(formState);
	};

	return (
		<>
			<ArrowButton onClick={openClose} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={rootRef}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800} align='left' uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(font) => handleChange('fontFamilyOption', font)}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(fontSize) => handleChange('fontSizeOption', fontSize)}
					/>

					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(fontColor) => handleChange('fontColor', fontColor)}
					/>

					<Separator />

					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(backgroundColor) =>
							handleChange('backgroundColor', backgroundColor)
						}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(contentWidth) =>
							handleChange('contentWidth', contentWidth)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button onClick={handleReset} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
