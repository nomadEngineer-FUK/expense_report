<script setup>
import TextBtn from './TextBtn.vue';

const closeModalWindow = () => {

}
</script>

<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <slot />
            <TextBtn
                text="Close"
                class="report-btn"
                button-text-color="text-white"
                button-bg-color="bg-gray"
                @click="$emit('closeModal')"
            />
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}
.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    width: 90%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}
</style>
