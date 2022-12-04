import { useState } from 'react';
import { Email as EmailComponent } from '../src/Email';
import { EmailProps } from '../src/types';

export function Email({ baseList, ...props }: Partial<EmailProps>) {
	const [email, setEmail] = useState('');

	const [focusCount, setFocusCount] = useState({
		focus: 0,
		blur: 0,
	});

	function handleFocus(type: keyof typeof focusCount) {
		setFocusCount((prevCount) => ({ ...prevCount, [type]: prevCount[type] + 1 }));
	}

	return (
		<>
			<EmailComponent
				id="CyEmail"
				onChange={setEmail}
				value={email}
				baseList={
					baseList || [
						'gmail.com',
						'yahoo.com',
						'hotmail.com',
						'aol.com',
						'outlook.com',
						'proton.me',
					]
				}
				onFocus={() => handleFocus('focus')}
				onBlur={() => handleFocus('blur')}
				{...props}
			/>
			<span id="CyFocusData" data-cy-focus={focusCount.focus} data-cy-blur={focusCount.blur} />
			<input type="text" id="CyNameInput" />
		</>
	);
}
