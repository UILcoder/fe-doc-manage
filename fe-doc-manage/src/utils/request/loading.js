import { Loading } from 'element-ui';

export default () => {
  if (!window._loading) {
    window._loading = Loading.service({ background: 'rgba(0,0,0,0.3)' });
  }
}
