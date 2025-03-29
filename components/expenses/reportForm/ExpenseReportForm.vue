<script setup>
import { useFormsStore } from '~/composables/ExpenseReport/useFormsStore'
import { useExpensesApi } from '~/composables/api/supabase/useExpensesApi'

// コンポーネント
import ExpenseReportFormForTableHeader from './ExpenseReportFormForTableHeader.vue'
import TextBtn from '@/components/commonTools/TextBtn.vue'
import ReportDetailForMobile from './ReportDetailForMobile.vue'
import ReportDetailForPC from './ReportDetailForPC.vue'

const { addExpense } = useExpensesApi()
const { forms, createNewForm } = useFormsStore()

const handleSubmit = async () => {
    const isSuccess = await addExpense(forms.value)
    if (isSuccess) forms.value = [createNewForm()]
}

// 端末により表示するコンポーネントを分ける
const isPC = ref(true)

const checkScreen = () => {
    isPC.value = window.innerWidth > 768
}

onMounted(() => {
    checkScreen()
    window.addEventListener('resize', checkScreen)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkScreen)
})
</script>

<template>
    <div class="expense-report-container">
        <div class="report-section">
            <ExpenseReportFormForTableHeader :label="'1. 経費の概要'" />
            <div class="report-contents-wrapper">
                <div class="contents purchase-date">
                    <label>1.1 購入日</label>
                    <input type="date" />
                </div>
                <div class="contents payee">
                    <label>1.2 支払先</label>
                    <input type="text" />
                </div>
            </div>
        </div>

        <div class="report-section">
            <ExpenseReportFormForTableHeader :label="'2. 経費の詳細'" />
            
            <!-- FIXME: モーダルウィンドウにする -->
            <p class="side-note">
                * 1つの経費支出の中で、用途が異なるものがある場合は、<br />「+」ボタンでフォームを複製して、それぞれ入力してください
            </p>

            <!-- PC用 -->
            <div v-if="isPC">
                <ReportDetailForPC />
            </div>

            <!-- モバイル用 -->
            <div v-else>
                <ReportDetailForMobile />
            </div>
        </div>

        <div class="report-section last-report-section">
            <ExpenseReportFormForTableHeader :label="'3. 備考'" />

            <div class="report-contents-wrapper">
                <div class="contents purchase-date">
                    <textarea
                        name="note"
                        id="note"
                        class="note-textarea"
                    ></textarea>
                </div>
            </div>
        </div>

        <div class="report-btn-container">
            <TextBtn
                text="確認する"
                button-text-color="text-white"
                button-bg-color="bg-blue"
                @click="handleSubmit()"
            />

            <TextBtn
                text="キャンセル"
                button-text-color="text-black"
                button-bg-color="bg-light-gray"
                button-hover-text-color="hover-text-white"
                button-hover-bg-color="hover-bg-gray"
            />
        </div>
    </div>
</template>

<style scoped>

/* Header & Input 共通のセルスタイル */
:deep(.input-row) {
    border-bottom: 1px solid #ddd;
}
:deep(.input-row):last-child {
    border-bottom: none;
}
:deep(.report-grid .cell) {
    width: 100%;
    height: 100%;
    font-size: 0.8rem;
    padding: 0.5rem;
    text-align: center;
}
:deep(.report-detail-header .cell) {
    font-weight: bold;
    color: #333;
}

.report-section {
    flex-wrap: wrap;
    margin-top: 2rem;
}
.last-report-section {
    margin-bottom: 3rem;
}
.report-contents-wrapper {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}
.contents {
    display: flex;
    flex-direction: column;
}
.side-note {
    width: 90%;
    margin: 0 auto;
    font-size: smaller;
    margin-bottom: 0.8rem;
    padding: 0.4rem;
}
.note-textarea {
    min-height: 5rem;
    min-width: 100%;
}

.report-btn-container {
    gap: 1rem;
    display: flex;
    margin-top: 1.2rem;
    justify-content: flex-end;
}

/* コンポーネント：TextBtn */
.text-btn {
    width: 40%;
    padding: 0.6rem 0;
    margin: 0 auto;
}
</style>
