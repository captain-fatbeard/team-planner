export function healthTest(pactum) {
    describe('health', () => {
        it('should show health status ok', () => {
            return pactum
                .spec()
                .get('/')
                .expectStatus(200)
                .expectJson({ 
                    status: 'ok'
                });
        });
    });
}
