<template>
    <div class="container">
        <footer>
            <b-nav align="center" tabs>
                <b-nav-item href="#">Support</b-nav-item>
                <b-nav-item href="#">Features</b-nav-item>
                <b-nav-item href="#">Privacy</b-nav-item>
                <b-nav-item href="#">FAQ</b-nav-item>
                <b-nav-item href="#">About</b-nav-item>
            </b-nav>
            <p class="text-center text-muted">© 2022 Sigma Software</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped lang="scss">
    .container {
        min-width: 100%;
        height: 150px;
        bottom: 0;
        background-color: rgb(58, 56, 56);
    }
    .nav-link, .nav-link:focus, .nav-link:hover {
        color: white;
    }
    p {
        padding-top: 10px;
    }
    footer {
        padding-top: 20px;
    }
</style>
