import { define, Component } from '@xinix/xin';

import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.min.css';
import 'select2-bootstrap4-theme/dist/select2-bootstrap4.min.css';
import './s2-select.scss';

export class S2Select extends Component {
  get props () {
    return Object.assign({}, super.props, {
      value: {
        type: String,
        value: '',
        notify: true,
        observer: 'valueChanged(value)',
      },

      options: {
        type: Array,
      },

      placeholder: {
        type: String,
      },

      allowClear: {
        type: Boolean,
        value: false,
      },

      multiple: {
        type: Boolean,
        value: false,
      },
    });
  }

  get template () {
    return require('./s2-select.html');
  }

  attached () {
    super.attached();

    this.$select = $(this.$$('select'));

    this.$select.on('change', evt => {
      this.set('value', this.$select.val());
    });

    this.$select.select2({
      theme: 'bootstrap4',
      data: this.options,
      placeholder: this.placeholder,
      allowClear: this.allowClear,
      multiple: this.multiple,
    });

    this.valueChanged(this.value);
  }

  detached () {
    super.detached();

    this.$select.off('change');
    this.$select.select2('destroy');
  }

  valueChanged (value) {
    if (this.$select) {
      this.$select.val(value).trigger('change.select2');
    }
  }
}

define('s2-select', S2Select);