<script setup>
import { useFormsStore } from '~/composables/ExpenseReport/useFormsStore';
import { useExpensesApi } from '~/composables/api/supabase/useExpensesApi';

// コンポーネント
import ReportSectionHeader from './ReportSectionHeader.vue';
import TextBtn from '@/components/commonTools/TextBtn.vue';
import ReportDetailForMobile from './ReportDetailForMobile.vue';
import ReportDetailForPC from './ReportDetailForPC.vue';

const { addExpense } = useExpensesApi();
const { forms, createNewForm } = useFormsStore();

const isConfirming = ref(false);
const onClickConfirm = () => {
    isConfirming.value = true;
};
const onClickSubmit = async () => {
    const isSuccess = await addExpense(forms.value);
    if (isSuccess) {
        forms.value = [createNewForm()];
        isConfirming.value = false;
    }
};
const onClickBack = () => {
    isConfirming.value = false;
};

// 端末により表示するコンポーネントを分ける
const isPC = ref(true);

const checkScreen = () => {
    isPC.value = window.innerWidth > 768;
};

onMounted(() => {
    checkScreen();
    window.addEventListener('resize', checkScreen);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkScreen);
});
</script>

<template>
    <div class="expense-report-container">
        <div class="report-section">
            <ReportSectionHeader :label="'1. 経費の概要'" />
            <div class="report-card">
                <div class="report-contents-wrapper">
                    <div class="contents purchase-date">
                        <label>1.1 購入日</label>
                        <template v-if="isConfirming">
                            <div class="readonly-field">
                                {{ forms[0].purchase_date }}
                            </div>
                        </template>
                        <template v-else>
                            <input
                                type="date"
                                v-model="forms[0].purchase_date"
                            />
                        </template>
                    </div>
                    <div class="contents payee">
                        <label>1.2 支払先</label>
                        <template v-if="isConfirming">
                            <div class="readonly-field">
                                {{ forms[0].payee }}
                            </div>
                        </template>
                        <template v-else>
                            <input
                                type="text"
                                v-model="forms[0].payee"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <div class="report-section">
            <ReportSectionHeader :label="'2. 経費の詳細'" />
            <div class="report-card">
                <p class="side-note">
                    *
                    1つの経費支出（一枚の領収証）の中で、用途が異なるものがある場合は、<br />
                    「+」ボタンでフォームを複製して、それぞれ入力してください
                </p>
                <ReportDetailForPC
                    v-if="isPC"
                    :is-Confirming="isConfirming"
                />
                <ReportDetailForMobile
                    v-else
                    :is-confirming="isConfirming"
                />
            </div>
        </div>

        <div class="report-section last-report-section">
            <ReportSectionHeader :label="'3. 備考'" />
            <div class="report-card">
                <div class="report-contents-wrapper">
                    <div class="contents purchase-date">
                        <template v-if="isConfirming">
                            <div class="readonly-field">
                                {{ forms[0].note }}
                            </div>
                        </template>
                        <template v-else>
                            <textarea
                                name="note"
                                id="note"
                                class="note-textarea"
                                v-model="forms[0].note"
                            ></textarea>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <div class="report-btn-container">
            <TextBtn
                v-if="!isConfirming"
                text="確認する"
                button-text-color="text-white"
                button-bg-color="bg-blue"
                @click="onClickConfirm"
            />
            <TextBtn
                v-if="isConfirming"
                text="戻る"
                button-text-color="text-white"
                button-bg-color="bg-gray"
                @click="onClickBack"
            />
            <TextBtn
                v-if="isConfirming"
                text="送信する"
                button-text-color="text-white"
                button-bg-color="bg-blue"
                @click="onClickSubmit"
            />
        </div>
    </div>
</template>

<style scoped>
.report-section {
    margin-top: 2rem;
}
.last-report-section {
    margin-bottom: 3rem;
}

.report-card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    width: 90%;
    margin: 0 auto;
}

.report-contents-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.contents {
    display: flex;
    flex-direction: column;
}

.side-note {
    font-size: 0.85rem;
    margin-bottom: 1rem;
    color: #555;
}

.note-textarea {
    min-height: 5rem;
    padding: 0.6rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    resize: vertical;
    font-size: 0.9rem;
}

.report-btn-container {
    gap: 1rem;
    display: flex;
    margin-top: 1.2rem;
    justify-content: flex-end;
    padding-right: 5%;
}

.readonly-field,
:deep(.readonly-field) {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
    min-height: 2.6rem;
    display: flex;
    align-items: center;
    white-space: pre-wrap;
    width: 100%;
}
</style>
