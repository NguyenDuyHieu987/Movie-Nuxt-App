import { createVNode, markRaw } from 'vue';
import type { ElMessageBoxOptions } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue';

declare type optionsConfirm = {
  title: string;
  message: string;
  okText?: string;
  cancelText?: string;
  onOk: () => any;
  onCancel: () => any;
} & ElMessageBoxOptions;

export function conrfirmMessageModal(options: optionsConfirm) {
  ElMessageBox({
    title: options.title,
    type: options.type || 'primary',
    icon: markRaw(QuestionFilled),
    message: createVNode('h3', {}, options.message),
    confirmButtonText: options?.okText || 'Có',
    confirmButtonClass: `el-button el-button--primary`,
    cancelButtonClass: `el-button`,
    cancelButtonText: options?.cancelText || 'Không',
    center: true,
    beforeClose: (action, instance, done) => {
      if (action === 'cancel') {
        // instance.confirmButtonLoading = true;
        // instance.confirmButtonText = 'Loading...';
        // instance.confirmButtonLoading = false;
        options?.onCancel();
      } else {
        done();
      }
    }
  }).then(() => {
    options?.onOk();
  });
}
