import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is ('zh') => {
	return param === 'zh';
}) satisfies ParamMatcher;