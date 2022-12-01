import { useEffect, useRef, useState } from 'react';
import { Email } from '../../src/Email';
import { Profiler } from './Profiler';
import { SelectData } from '../../src/types';
import { Checkbox, Options } from './Checkbox';
import { ValidityIcon } from './ValidityIcon';
import { Header } from './Header';
import { Footer } from './Footer';
import domainList from '../../src/domains.json';

enum Valididty {
	Idle,
	Valid,
	Invalid,
}

const checkboxes: [string, keyof Options][] = [
	['Refine Mode', 'withRefine'],
	['Events/Children', 'eventHandlers'],
	['onSelect Callback', 'customOnSelect'],
];

const baseList = ['google.com', 'email.com', 'proton.me', 'yahoo.com', 'outlook.com', 'aol.com'];

export function App() {
	const inputRef = useRef<HTMLInputElement>(null);

	const [options, setOptions] = useState<Options>({
		withRefine: true,
		customOnSelect: true,
		eventHandlers: true,
	});

	const [email, setEmail] = useState<string>('');
	const [validity, setValidity] = useState<Valididty>(Valididty.Idle);
	const [selectionData, setSelectionData] = useState<SelectData | null>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		if (!options.eventHandlers) {
			setValidity(Valididty.Idle);
		}
	}, [options.eventHandlers]);

	function handleBlur() {
		console.log('Blur');
		setValidity(testEmail(email) ? Valididty.Valid : Valididty.Invalid);
	}

	function handleFocus() {
		console.log('Focus');
		setValidity(Valididty.Idle);
	}

	function customOnSelect(data: SelectData) {
		setSelectionData(data);
	}

	return (
		<>
			<div className="wrapper">
				<Header />

				<nav className="checkboxNav">
					{checkboxes.map(([label, prop]) => (
						<Checkbox key={prop} label={label} name={prop} state={options} setState={setOptions} />
					))}
				</nav>

				{options.customOnSelect && selectionData && (
					<div className="selectionInfo">
						{Object.entries(selectionData).map(([key, value]) => (
							<div key={key}>
								<span>{key}: </span>
								{`${value}`}
							</div>
						))}
					</div>
				)}

				<div className="emailWrapper">
					<label htmlFor="reactEms">Your Email</label>
					<Profiler>
						<Email
							ref={inputRef}
							baseList={baseList}
							onChange={setEmail}
							value={email}
							domainList={options.withRefine ? domainList : []}
							classNames={{
								wrapper: 'wrapperClass',
								input: `inputClass ${validity === Valididty.Invalid ? 'invalidInput' : ''}`,
								dropdown: 'dropdownIn',
							}}
							// Events
							onSelect={options.customOnSelect ? customOnSelect : undefined}
							onBlur={options.eventHandlers ? handleBlur : undefined}
							onFocus={options.eventHandlers ? handleFocus : undefined}
							// Atrributes
							className="customClass"
							name="reactEms"
							id="reactEms"
							placeholder="Please enter your email"
						>
							{options.eventHandlers && (
								<ValidityIcon
									isActive={options.eventHandlers}
									isError={validity === Valididty.Invalid}
									isValid={validity === Valididty.Valid}
								/>
							)}
						</Email>
					</Profiler>
				</div>
			</div>

			<Footer />
		</>
	);
}

function testEmail(value: string) {
	return /^\w+@[a-zA-Z.,]+?\.[a-zA-Z]{2,3}$/.test(value);
}
