import { MessageService } from './message.service';

describe('Message Test we Have', () => {
  beforeEach(() => {});

  it('you Should have one message ', () => {
    // Arrange
    let messageService: MessageService;
    messageService = new MessageService();

    // Act
    messageService.add('message 1');

    // Assert
    expect(messageService.messages.length).toBe(1);
  });

  it('you Should not have ant message ', () => {
    // Arrange
    let messageService: MessageService;
    messageService = new MessageService();

    // Act
    messageService.clear();

    // Assert
    expect(messageService.messages.length).toBe(0);
  });

  it('you Should Clear Message', () => {
    // Arrange
    let messageService: MessageService;
    messageService = new MessageService();
    messageService.add('message1');
    // Act
    messageService.clear();
    // Assert
    expect(messageService.messages.length).toBe(0);
  });
});
