Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        orderInfo:{
            type:Object,
            value:null
        },
        orderState: {
            type: Number,
            value: null
        },
        showReceiveBtn: {
            type: Boolean,
            value: false
        },
        showCancelBtn: {
            type: Boolean,
            value: false
        },
        showDelBtn: {
            type: Boolean,
            value: false
        },
        showEvaluateBtn: {
            type: Boolean,
            value: false
        },
        showPayBtn: {
            type: Boolean,
            value: false
        },
        showLogisticsBtn: {
            type: Boolean,
            value: false
        },
    },
    methods: {
        onClick() {
            this.triggerEvent('click', { orderId: this.data.orderId });
        },
        onCancel() {
            this.triggerEvent('cancel', { orderId: this.data.orderId });
        },
        onReceive() {
            this.triggerEvent('receive', { orderInfo: this.data.orderInfo });
        },
        onPay() {
            this.triggerEvent('pay', { orderInfo: this.data.orderInfo });
        },
        onEvaluate(){
            this.triggerEvent('evaluate', { orderInfo: this.data.orderInfo });
        },
        onLogistics(){
            this.triggerEvent('logistics', { orderId: this.data.orderId });
        }
    }
});
