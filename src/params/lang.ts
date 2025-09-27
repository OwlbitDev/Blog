import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is ('zh'|'en') => {
	return param === 'zh'|| param === 'en';
}) satisfies ParamMatcher;