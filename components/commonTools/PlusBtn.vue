<template>
    <div class="wrapper-plus-minus-btn">
        <div class="btn-puls">
            <button
                class="btn-text"
                @click="$emit('add-form-to-top')"
            >
                +
            </button>
        </div>
    </div>
</template>

<style scoped>
.btn-puls {
    background-color: #327ddf;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    width: 1.2rem;
    height: 1.2rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    text-align: center;
    justify-content: center;
    display: flex;
}
.btn-text {
    color: aliceblue;
    font-weight: bold;
    font-size: 1rem;
}
</style>
