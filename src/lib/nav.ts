import { router } from 'expo-router';

/** Back that never throws GO_BACK: falls back to the tabs if there's no history. */
export function safeBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/');
}

export function openBrief(caseId: string, done: boolean) {
  if (done) router.push({ pathname: '/brief/[caseId]/done', params: { caseId } });
  else router.push({ pathname: '/brief/[caseId]', params: { caseId } });
}
