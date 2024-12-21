<script setup lang="ts">
import { useUsers } from "~/composables/users";
import { useDepartments } from "~/composables/departments";
import { useAccountingItems } from "~/composables/accountingItems";
import { onMounted } from "vue";

const { users, fetchUsers } = useUsers();
const { departments, fetchDepartments } = useDepartments();
const { accountingItems, fetchAccountingItems } = useAccountingItems();

onMounted(() => {
    fetchUsers();
    fetchDepartments();
    fetchAccountingItems();
});
</script>

<template>
    <!-- フォーム グループ 2：経費詳細 -->
    <div class="input-group-block">

        <div class="input-group-every-step">
            <p class="input-group-main-note">
                [STEP 2] 申請する経費の入力
            </p>
            <p class="input-group-sub-note">
                &nbsp;&nbsp;*領収証の内容を入力してください
            </p>
        </div>

        <!-- ここはカスタマイズできるようにしたい -->
        <div class="input-form-group input-expense-detail">

            <!-- ここは必須ではない。申請部署と異なる場合のみ記入する -->
            <!-- 申請部署=経費計上部署の場合、空欄にするか、所属部署を入力するか要検討 -->
            <div class="field-row">
                <label for="expense-department">経費計上部署</label>
                <select name="expense-department" id="expense-department">
                    <option
                        v-for="department in departments"
                        :key="department.id">
                            {{ department.name }}
                    </option>
                </select>
            </div>

            <div class="field-row">
                <label for="accounting-item">勘定科目</label>
                <select name="accounting-item" id="accounting-item">
                    <option
                        v-for="accountingItem in accountingItems"
                        :key="accountingItem.id">
                            {{ accountingItem.name }}
                    </option>
                </select>
            </div>

            <div class="field-row">
                <label for="expense-date">購入日</label>
                <input id="expense-date" name="expense-date" type="date">
            </div>
            <div class="field-row">
                <label for="expense-item">購入したもの・サービス</label>
                <input id="expense-item" name="expense-item" type="text">
            </div>
            <div class="field-row">
                <label for="vendor-name">支払先</label>
                <input id="vendor-name" name="vendor-name" type="text">
            </div>
            <div class="field-row">
                <label for="expense-amount">精算金額</label>
                <input id="expense-amount" name="expense-amount" type="text">
            </div>
            <div class="field-row">
                <label for="note-by-applicant">備考</label>
                <textarea name="note-by-applicant" id="note-by-applicant"></textarea>
            </div>
        </div>
    </div>

</template>

<style scoped>
.input-group-wrapper {
    border-bottom: 2px solid rgba(192, 192, 192, 0.6);
}

</style>
