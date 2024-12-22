<script setup lang="ts">
import { useUsers } from '~/composables/users';
import { onMounted } from 'vue';

const { users, fetchUsers } = useUsers();

onMounted(() => {
    fetchUsers();
});
</script>


<!-- 手土産を選択した場合との分岐にしても良いかも -->
<!-- どちらもSTEP3にして、科目次第でstep3の内容が変わる -->
<!-- 会議費接待交際費以外であればそもそも出てこない -->


<template>
    <div class="input-group-block">

        <div class="input-group-every-step">
            <p class="input-group-main-note">
                [STEP 3] STEP2 の勘定科目で [会議費] or [接待交際費] を選択した場合の追加質問
            </p>
            <!-- <p class="input-group-sub-note">
                &nbsp;&nbsp;*入力内容が異なる場合は<span>こちら</span>へ情報の修正を依頼してください。<br>
                &nbsp;&nbsp;*修正が反映されたことを確認した上で経費申請をしてください。
            </p> -->
        </div>

        <!-- フォーム グループ 3：会議費・接待交際費の場合の追加質問 -->
        <div class="input-form-group input-additional-item">
            <div class="form-field block-field">
                <label for="participant-type">同席者について</label>
                <select name="participant-type" id="participant-type" class="width-forty-two-five">
                    <option value="1">社内の者だけが参加</option>
                    <option value="2">社外・社内の両方が参加</option>
                </select>
            </div>
            <div class="form-row-group">
                <div class="form-field">
                    <label for="meeting-purpose">開催目的</label>
                    <textarea class="width-ninety" name="meeting-purpose" id="meeting-purpose"></textarea>
                </div>
                <div class="form-field">
                    <label for="attendee-list">参加者を全員回答してください</label>
                    <textarea class="width-ninety" name="attendee-list" id="attendee-list"></textarea>
                </div>
            </div>
            <div class="form-field">
                <label for="note-by-applicant-at-meeting">備考</label>
                <textarea class="width-ninety-five" name="note-by-applicant-at-meeting"
                    id="note-by-applicant-at-meeting"></textarea>
            </div>
        </div>
    </div>

</template>

<style scoped>
.form-row-group {
    display: flex;
    gap: 1rem;
    grid-template-columns: 50% 50%;
}
.form-field {
    flex-basis: 100%;
}
.form-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}
.block-field {
    display: block;
}
.form-field select,
.form-field textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.form-field textarea {
    min-height: 5rem;
    resize: vertical;
    box-sizing: border-box;
}

</style>
