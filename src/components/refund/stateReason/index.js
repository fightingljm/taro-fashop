import Time from '../../../utils/time'
Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        refundInfo: {
            type: Object,
            value: null
        }
    },

    methods: {
        onUndo() {
            this.triggerEvent('undo', { refundInfo: this.data.refundInfo });
        },
        onTrack(){
            this.triggerEvent('track', { refundInfo: this.data.refundInfo });
        }
    }
});
