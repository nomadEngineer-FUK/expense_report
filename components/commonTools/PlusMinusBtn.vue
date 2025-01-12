<template>
    <div class="wrapper-plus-minus-btn">
        <div class="btn-puls">
            <button class="btn-text" @click="$emit('add-form')">
                +
            </button>
        </div>
        <div class="btn-minus">
            <button class="btn-text" @click="$emit('remove-form')">
                -
            </button>
        </div>
    </div>
</template>

<style scoped>
.btn-puls,
.btn-minus {
    background-color: #327ddf;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    text-align: center;
    justify-content: center;
    display: flex;
}
.btn-puls {
    margin-bottom: 0.3rem;
}
.btn-text {
    color: aliceblue;
}
</style>
