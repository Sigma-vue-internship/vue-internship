<template>
    <div class="container">
        <footer class="py-3 my-4">
            <ul class="nav justify-content-center border-top pb-3 mb-3">
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-muted">Support</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-muted">Features</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-muted">Privacy</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-muted">FAQ</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-muted">About</a>
                </li>
            </ul>
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
        position: fixed;
        bottom: 0;
    }
</style>