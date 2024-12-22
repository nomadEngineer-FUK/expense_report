<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <p>経費精算</p>
        </div>
        <nav class="sidebar-nav">
            <ul class="nav-list">
                <li class="nav-item">home</li>
                <li class="nav-item">申請する</li>
                <li class="nav-item">申請履歴</li>
                <li class="nav-item">承認する</li>
                <li class="nav-item">申請一覧</li>
                <li class="nav-item">プロフィール</li>
                <li class="nav-item">アカウント一覧</li>
                <li class="nav-item">設定</li>
                <li class="nav-item">FAQ</li>
                <li class="nav-item">ログアウト</li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.sidebar {
    /* width: 200px; */
    width: 12%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding: 1rem;
    overflow: hidden;
    background-color: #e1edf9;
}
.sidebar-header {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0 0.6rem;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
}
.sidebar-nav {
    margin-top: 1.8rem;
    text-align: center;
}
.nav-list {
    list-style: none;
    padding: 0;
}
.nav-item {
    padding: 0.6rem 0;
}
.nav-item:hover {
    background-color: #c3dcf4e5;
    transition: 0.3s;
    border-radius: 0.4rem;
}
</style>
