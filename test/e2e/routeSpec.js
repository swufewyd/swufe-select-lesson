describe('E2E: Login', function() {
	it('username should be longer than 3 chars', function() {
		browser().navigateTo('/reg');
		// expect(browser().location().path()).toBe('/login');
		input("usernamesignup").enter("ss");
		// expect(element('#userAlert','userAlert div').html()).not.toBe('密码');

	});

	it('should login to the home page', function() {
		expect(false).not.toBe(true);
		browser().navigateTo('/');
		expect(browser().location().path()).not.toBe('/login');
		input("username").enter("wyd");
		input("password").enter("218");
		element('form input[type="submit"]').click();
		expect(browser().location().path()).toBe('/home');
		element('#me-button').click();
		element('#logout').click();
	});
});
