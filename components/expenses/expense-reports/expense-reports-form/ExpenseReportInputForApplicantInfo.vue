<script setup lang="ts">
import { useUsers } from '~/composables/users';
import { useDepartments } from '~/composables/departments';
import { onMounted } from 'vue';

const { users, fetchUsers } = useUsers();
const { departments, fetchDepartments } = useDepartments();

onMounted(() => {
    fetchUsers();
    fetchDepartments();
})

</script>

<template>
    <div class="input-group-block">
        <div class="input-group-every-step">
            <p class="input-group-main-note">
                [STEP 1] 申請者の登録内容の確認
            </p>
            <p class="input-group-sub-note">
                &nbsp;&nbsp;*入力内容が異なる場合は<span>こちら</span>へ情報の修正を依頼してください。<br>
                &nbsp;&nbsp;*修正が反映されたことを確認した上で経費申請をしてください。
            </p>
        </div>

        <!-- フォーム グループ 1：申請者情報 -->
        <div class="input-form-group input-applicant-info">

            <div class="field-row">
                <label for="request-date">申請日</label>
                <input id="request-date" name="request-date" type="date" value="当日の日付を自動入力" readonly>
            </div>
            <div class="field-row">
                <label for="applicant-name">氏名</label>
                <input id="applicant-name" name="applicant-name" type="text" :value="users?.[1]?.username" readonly>
            </div>

            <div class="field-row">
                <label for="applicant-department">所属部署</label>
                <input id="applicant-department" name="applicant-department" type="text" :value="departments?.[1]?.name" readonly>
            </div>
        </div>
    </div>

</template>

<style scoped>
.input-group-wrapper {
    border-bottom: 2px solid rgba(192, 192, 192, 0.6);
}

.input-applicant-info {
    display: flex;
}

</style>