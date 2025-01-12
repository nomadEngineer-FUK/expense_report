<template>
    <div class="wrapper-plus-minus-btn">
        <div class="btn-puls">
            <button class="btn-text" @click="$emit('add-form-to-top')">
                +
            </button>
        </div>
    </div>
</template>

<style scoped>
.btn-puls {
    background-color: #327ddf;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    text-align: center;
    justify-content: center;
    display: flex;
    border: none;
}

.btn-text {
    color: aliceblue;
    font-weight: bold;
    font-size: 1rem;
}

/* button {
    width: 100%;
    height: 100%;
    border-radius: 50%;
} */

</style>
