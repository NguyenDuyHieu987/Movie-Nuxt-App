import { createVNode } from 'vue';
import {
  // InfoCircleOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import type { ModalFuncProps } from 'ant-design-vue';

declare type optionsConfirm = {
  title: string;
  message: string;
  okText?: string;
  cancelText?: string;
  onOk: () => any;
  onCancel: () => any;
} & ModalFuncProps;

export function conrfirmMessageModal(options: optionsConfirm) {
  Modal.confirm({
    title: options.title,
    icon: createVNode(QuestionCircleOutlined),
    content: createVNode('h3', {}, options.message),
    okText: options?.okText || 'Có',
    okButtonProps: {
      type: 'primary',
      size: 'middle',
      danger: options.okButtonProps?.danger
    },
    cancelButtonProps: { type: 'default', size: 'middle' },
    cancelText: options?.cancelText || 'Không',
    centered: true,
    maskClosable: true,
    onOk() {
      options?.onOk();
    },
    onCancel() {
      options?.onCancel();
    }
  });
}
